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
	BrandRepository brandRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	@Transactional
	public ProductDto createProduct(ProductDto productDetails) {
		ProductEntity productEntity = modelMapper.map(productDetails, ProductEntity.class);
		productEntity.setExternalId(UUID.randomUUID().toString());

		if (productEntity.getBrand() != null) {
			if (productEntity.getBrand().getExternalId() == null) {
				throw new RuntimeException(
						"Brand ID is missing. Please check the request.");
			}
			BrandEntity brandEntity = brandRepository.findByExternalId(productEntity.getBrand().getExternalId());
			if (brandEntity == null) {
				throw new RuntimeException(
						"Brand '" + productDetails.getBrand().getId() + "' does not exist. Please check the request.");
			}
		} else {
			throw new RuntimeException("Brand is required. Please create one first");
		}

//		if (productEntity.getProductTags() != null && !productEntity.getProductTags().isEmpty()) {
//			List<ProductTagEntity> tags = new ArrayList<>();
//			productEntity.getProductTags().forEach(tag -> {
//				ProductTagEntity savedProductTag = productTagRepository.findByName(tag.getName());
//				if (savedProductTag != null) {
//					savedProductTag.getProducts().add(productEntity);
//					tags.add(savedProductTag);
//				} else {
//					List<ProductEntity> products = new ArrayList<>();
//					products.add(productEntity);
//					tag.setExternalId(UUID.randomUUID().toString());
//					tag.setProducts(products);
//					tags.add(tag);
//				}
//			});
//			productEntity.setProductTags(tags);
//		}
//
//		if (productEntity.getProductAttributes() != null) {
//			for (ProductAttributeEntity attribute : productEntity.getProductAttributes()) {
//				attribute.setProduct(productEntity);
//				attribute.setExternalId(UUID.randomUUID().toString());
//			}
//		}

//		if (productEntity.getProductVariants() != null) {
//			for (ProductVariantEntity variant : productEntity.getProductVariants()) {
//				variant.setProduct(productEntity);
//				variant.setExternalId(UUID.randomUUID().toString());
//
//				Set<ProductAttributeEntity> linkedAttributes = new HashSet<>();
//				if (variant.getProductAttributes() != null) {
//					for (ProductAttributeEntity dtoAttr : variant.getProductAttributes()) {
//						ProductAttributeEntity matchedAttr = productEntity.getProductAttributes().stream()
//								.filter(a -> a.getAttributeKey() != null
//										&& a.getAttributeKey().toLowerCase()
//												.equals(dtoAttr.getAttributeKey().toLowerCase())
//										&& a.getAttributeValue() != null
//										&& a.getAttributeValue().toLowerCase()
//												.equals(dtoAttr.getAttributeValue().toLowerCase()))
//								.findFirst().orElse(null);
//
//						if (matchedAttr == null) {
//							throw new RuntimeException("Product attribute '" + dtoAttr.getAttributeKey() + ":"
//									+ dtoAttr.getAttributeValue() + "' not found on product");
//						}
//						if (matchedAttr.getProductVariants() == null) {
//							matchedAttr.setProductVariants(new ArrayList<>());
//						}
//						linkedAttributes.add(matchedAttr);
//						matchedAttr.getProductVariants().add(variant);
//					}
//				}
//				variant.setProductAttributes(linkedAttributes);
//
//				List<SupplierProductVariantEntity> newLinks = new ArrayList<>();
//				if (variant.getSupplierProductVariants() != null) {
//					List<SupplierProductVariantEntity> originalSupplierLinks = new ArrayList<>(
//							variant.getSupplierProductVariants());
//					for (SupplierProductVariantEntity supplierProductVariant : originalSupplierLinks) {
//						SupplierEntity supplierEntity = supplierRepository
//								.findByExternalId(supplierProductVariant.getSupplier().getExternalId());
//						if (supplierEntity == null) {
//							throw new RuntimeException("Supplier not found");
//						}
//						SupplierProductVariantEntity supplierProductVariantlink = new SupplierProductVariantEntity();
//						supplierProductVariantlink.setProductVariant(variant);
//						supplierProductVariantlink.setSupplier(supplierEntity);
//						supplierProductVariantlink.setSupplierPrice(supplierProductVariant.getSupplierPrice());
//						supplierProductVariantlink.setTaxRate(supplierProductVariant.getTaxRate());
//						supplierProductVariantlink
//								.setId(new SupplierProductVariantCompositeKey(variant.getId(), supplierEntity.getId()));
//						newLinks.add(supplierProductVariantlink);
//					}
//				}
//				variant.setSupplierProductVariants(newLinks);
//
//				List<InventoryEntity> newInventories = new ArrayList<>();
//				if (variant.getInventories() != null) {
//					List<InventoryEntity> originalInventories = new ArrayList<>(variant.getInventories());
//					for (InventoryEntity inventory : originalInventories) {
//						SupplierEntity supplierEntity = supplierRepository
//								.findByExternalId(inventory.getSupplier().getExternalId());
//						if (supplierEntity == null) {
//							throw new RuntimeException("Supplier not found");
//						}
//						OutletEntity outletEntity = outletRepository
//								.findByExternalId(inventory.getOutlet().getExternalId());
//						if (outletEntity == null) {
//							throw new RuntimeException("Outlet not found");
//						}
//						InventoryEntity inventoryLink = new InventoryEntity();
//						inventoryLink.setProductVariant(variant);
//						inventoryLink.setSupplier(supplierEntity);
//						inventoryLink.setOutlet(outletEntity);
//						inventoryLink.setQuantity(inventory.getQuantity());
//						inventoryLink.setReorderThreshold(inventory.getReorderThreshold());
//						inventoryLink.setReorderQty(inventory.getReorderThreshold());
//						newInventories.add(inventoryLink);
//					}
//				}
//				variant.setInventories(newInventories);
//			}
//		}

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
