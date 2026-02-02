package com.vendorpov.Products.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.vendorpov.Products.data.BrandEntity;
import com.vendorpov.Products.data.BrandRepository;
import com.vendorpov.Products.data.InventoryEntity;
import com.vendorpov.Products.data.OutletEntity;
import com.vendorpov.Products.data.OutletRepository;
import com.vendorpov.Products.data.ProductAttributeEntity;
import com.vendorpov.Products.data.ProductEntity;
import com.vendorpov.Products.data.ProductRepository;
import com.vendorpov.Products.data.ProductTagEntity;
import com.vendorpov.Products.data.ProductTagRepository;
import com.vendorpov.Products.data.ProductVariantEntity;
import com.vendorpov.Products.data.ProductVariantRepository;
import com.vendorpov.Products.data.SupplierEntity;
import com.vendorpov.Products.data.SupplierProductVariantCompositeKey;
import com.vendorpov.Products.data.SupplierProductVariantEntity;
import com.vendorpov.Products.data.SupplierRepository;
import com.vendorpov.Products.shared.ProductDto;

import jakarta.transaction.Transactional;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	ProductRepository productRepository;
		@Autowired
		ProductTagRepository productTagRepository;
	@Autowired
	SupplierRepository supplierRepository;
	@Autowired
	OutletRepository outletRepository;
	@Autowired
	ProductVariantRepository productVariantRepository;
	@Autowired
	BrandRepository brandRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	@Transactional
	public ProductDto createProduct(ProductDto productDetails) {
		ProductEntity productEntity = modelMapper.map(productDetails, ProductEntity.class);
		productEntity.setExternalId(UUID.randomUUID().toString());

		// 1. Validate the incoming request data first
		if (productDetails.getBrand() == null || productDetails.getBrand().getId() == null) {
		    throw new RuntimeException("Brand ID is required.");
		}

		// 2. Fetch the managed entity from the DB
		BrandEntity savedBrand = brandRepository.findByExternalId(productDetails.getBrand().getId());

		if (savedBrand == null) {
		    throw new RuntimeException("Brand '" + productDetails.getBrand().getId() + "' does not exist.");
		}

		// 3. Establish the relationship
		// This is the "Product-first" approach which is standard for ownership
		savedBrand.addProduct(productEntity);

		// Optional: Only if you need the Brand object to reflect the change in the same transaction
//	    savedBrand.getProducts().add(productEntity);

		if (productEntity.getProductTags() != null && !productEntity.getProductTags().isEmpty()) {
			Set<ProductTagEntity> tags = new HashSet<>();
			productEntity.getProductTags().forEach(tag -> {
				ProductTagEntity savedProductTag = productTagRepository.findByName(tag.getName());
				if (savedProductTag != null) {
					savedProductTag.getProducts().add(productEntity);
					tags.add(savedProductTag);
				} else {
					Set<ProductEntity> products = new HashSet<>();
					products.add(productEntity);
					tag.setExternalId(UUID.randomUUID().toString());
					tag.setProducts(products);
					tags.add(tag);
				}
			});
			productEntity.setProductTags(tags);
		}

		if (productEntity.getProductAttributes() != null) {
			for (ProductAttributeEntity attribute : productEntity.getProductAttributes()) {
				attribute.setProduct(productEntity);
				attribute.setExternalId(UUID.randomUUID().toString());
			}
		}

		if (productEntity.getProductVariants() != null) {
			for (ProductVariantEntity variant : productEntity.getProductVariants()) {
				variant.setProduct(productEntity);
				variant.setExternalId(UUID.randomUUID().toString());
				
				if (variant.getProductAttributes() != null) {
	                Set<ProductAttributeEntity> linkedAttributes = new HashSet<>();
	                for (ProductAttributeEntity attrProxy : variant.getProductAttributes()) {
	                    // Find the actual attribute instance already attached to the product
	                    ProductAttributeEntity realAttr = productEntity.getProductAttributes().stream()
	                        .filter(a -> a.getAttributeKey().equalsIgnoreCase(attrProxy.getAttributeKey()) 
	                                  && a.getAttributeValue().equalsIgnoreCase(attrProxy.getAttributeValue()))
	                        .findFirst()
	                        .orElseThrow(() -> new RuntimeException("Attribute not found"));
	                    
	                    linkedAttributes.add(realAttr);
	                }
	                variant.setProductAttributes(linkedAttributes);
	            }

				List<SupplierProductVariantEntity> newLinks = new ArrayList<>();
				if (variant.getSupplierProductVariants() != null) {
				    for (SupplierProductVariantEntity supplierProductVariant : variant.getSupplierProductVariants()) {
				        SupplierEntity supplierEntity = supplierRepository
				                .findByExternalId(supplierProductVariant.getSupplier().getExternalId());
				        
				        if (supplierEntity == null) {
				            throw new RuntimeException("Supplier not found");
				        }

				        SupplierProductVariantEntity link = new SupplierProductVariantEntity();
				        
				        // 1. MUST initialize the ID object first
				        link.setId(new SupplierProductVariantCompositeKey()); 
				        
				        // 2. Set the entities. @MapsId tells Hibernate to extract the 
				        // IDs from these objects and put them into the 'link.id'
				        link.setProductVariant(variant);
				        link.setSupplier(supplierEntity);
				        
				        link.setSupplierPrice(supplierProductVariant.getSupplierPrice());
				        link.setTaxRate(supplierProductVariant.getTaxRate());
				        
				        newLinks.add(link);
				    }
				}
				variant.setSupplierProductVariants(newLinks);

				List<InventoryEntity> newInventories = new ArrayList<>();
				if (variant.getInventories() != null) {
					List<InventoryEntity> originalInventories = new ArrayList<>(variant.getInventories());
					for (InventoryEntity inventory : originalInventories) {
						SupplierEntity supplierEntity = supplierRepository
								.findByExternalId(inventory.getSupplier().getExternalId());
						if (supplierEntity == null) {
							throw new RuntimeException("Supplier not found");
						}
						OutletEntity outletEntity = outletRepository
								.findByExternalId(inventory.getOutlet().getExternalId());
						if (outletEntity == null) {
							throw new RuntimeException("Outlet not found");
						}
						InventoryEntity inventoryLink = new InventoryEntity();
						inventoryLink.setProductVariant(variant);
						inventoryLink.setSupplier(supplierEntity);
						inventoryLink.setOutlet(outletEntity);
						inventoryLink.setQuantity(inventory.getQuantity());
						inventoryLink.setReorderThreshold(inventory.getReorderThreshold());
						inventoryLink.setReorderQty(inventory.getReorderThreshold());
						newInventories.add(inventoryLink);
					}
				}
				variant.setInventories(newInventories);
			}
		}

//		List<SupplierResponseModel> suppliers = supplierServiceClient.getSuppliers();

		ProductEntity createdProduct = productRepository.save(productEntity);
		return modelMapper.map(createdProduct, ProductDto.class);
	}

	@Override
	public List<ProductDto> getProducts(int page, int limit) {
		List<ProductDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<ProductEntity> productPage = productRepository.findAll(pageRequest);
		List<ProductEntity> products = productPage.getContent();
		for (ProductEntity product : products) {
			ProductDto productDto = modelMapper.map(product, ProductDto.class);
			productDto.setId(product.getExternalId());
			returnValue.add(productDto);
		}
		return returnValue;
	}

	@Override
	public ProductDto getProductByExternalId(String id) {
		ProductEntity productEntity = productRepository.findByExternalId(id);
		if (productEntity == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with ID: " + id);
		}
		ProductDto returnValue = modelMapper.map(productEntity, ProductDto.class);
		returnValue.setId(productEntity.getExternalId());
		return returnValue;
	}

	@Override
	public ProductDto updateProduct(String id, ProductDto productDetails) {
		ProductEntity productEntity = productRepository.findByExternalId(id);
		ProductDto productDto = modelMapper.map(productEntity, ProductDto.class);

		productDto.setName(productDetails.getName());
		productDto.setDescription(productDetails.getDescription());
		productDto.setBrand(productDetails.getBrand());
		productDto.setProductTags(productDetails.getProductTags());
		productDto.setProductAttributes(productDetails.getProductAttributes());
		productDto.setProductVariants(productDetails.getProductVariants());

		ProductEntity product = modelMapper.map(productDto, ProductEntity.class);
		ProductEntity updatedProduct = productRepository.save(product);

		ProductDto returnValue = modelMapper.map(updatedProduct, ProductDto.class);
		returnValue.setId(id);
		return returnValue;
	}

	@Override
	public void deleteProduct(String id) {
		ProductEntity productEntity = productRepository.findByExternalId(id);
		productRepository.delete(productEntity);
	}

}
