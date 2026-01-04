package com.vendorpov.Products.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
//	SupplierServiceClient supplierServiceClient;
	SupplierRepository supplierRepository;

	@Override
	@Transactional
	public ProductDto createProduct(ProductDto productDetails) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		ProductEntity productEntity = modelMapper.map(productDetails, ProductEntity.class);
		productEntity.setProductId(UUID.randomUUID().toString());
		
		if (productEntity.getProductTags() != null && !productEntity.getProductTags().isEmpty()) { 
			List<ProductTagEntity> tags = new ArrayList<>();
			productEntity.getProductTags().forEach(tag -> {
				ProductTagEntity savedProductTag = productTagRepository.findByName(tag.getName());
				if(savedProductTag != null) {
					savedProductTag.getProducts().add(productEntity);
					tags.add(savedProductTag);
				} else {
					List<ProductEntity> products = new ArrayList<>();
					products.add(productEntity);
					tag.setProductTagId(UUID.randomUUID().toString());
					tag.setProducts(products);
					tags.add(tag);
				}
			});
			productEntity.setProductTags(tags);
		}
		
		if (productEntity.getProductAttributes() != null) {
	        for (ProductAttributeEntity attribute : productEntity.getProductAttributes()) {
	            attribute.setProduct(productEntity);
	            attribute.setProductAttributeId(UUID.randomUUID().toString());
	        }
	    }
		
		if (productEntity.getProductVariants() != null) {
	        for (ProductVariantEntity variant : productEntity.getProductVariants()) {
	            variant.setProduct(productEntity);
	            variant.setProductVariantId(UUID.randomUUID().toString());

	            Set<ProductAttributeEntity> linkedAttributes = new HashSet<>();

	            if (variant.getProductAttributes() != null) {
	                for (ProductAttributeEntity dtoAttr : variant.getProductAttributes()) {
	                    ProductAttributeEntity matchedAttr = productEntity.getProductAttributes().stream()
	                        .filter(a -> a.getAttributeKey() != null && a.getAttributeKey().toLowerCase().equals(dtoAttr.getAttributeKey().toLowerCase()) && 
	                                     a.getAttributeValue() != null && a.getAttributeValue().toLowerCase().equals(dtoAttr.getAttributeValue().toLowerCase()))
	                        .findFirst()
	                        .orElse(null);

	                    if (matchedAttr == null) {
	                        throw new RuntimeException("Product attribute '" + dtoAttr.getAttributeKey() + ":" + dtoAttr.getAttributeValue() + "' not found on product");
	                    }
	                    if (matchedAttr.getProductVariants() == null) {
	                        matchedAttr.setProductVariants(new ArrayList<>());
	                    }
	                    linkedAttributes.add(matchedAttr);
	                    matchedAttr.getProductVariants().add(variant);
	                }
	            } 
	            variant.setProductAttributes(linkedAttributes);
	            
				List<SupplierProductVariantEntity> newLinks = new ArrayList<>();
	            if (variant.getSupplierProductVariants() != null) {
	            	List<SupplierProductVariantEntity> originalSupplierLinks = new ArrayList<>(variant.getSupplierProductVariants());
					for (SupplierProductVariantEntity supplierProductVariant : originalSupplierLinks) {
						SupplierEntity supplierEntity = supplierRepository.findBySupplierId(supplierProductVariant.getSupplier().getSupplierId());
						if(supplierEntity==null) {
							throw new RuntimeException("Supplier not found");
						}
						SupplierProductVariantEntity link = new SupplierProductVariantEntity();
						link.setProductVariant(variant);
						link.setSupplier(supplierEntity);
						link.setSupplierPrice(supplierProductVariant.getSupplierPrice());
						link.setTaxRate(supplierProductVariant.getTaxRate());
						link.setId(new SupplierProductVariantCompositeKey(variant.getId(), supplierEntity.getId()));
						newLinks.add(link);
					}
				}
				variant.setSupplierProductVariants(newLinks);
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
		for(ProductEntity product: products) {
			ModelMapper modelMapper = new ModelMapper();
			modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

			ProductDto productDto = modelMapper.map(product, ProductDto.class);
			returnValue.add(productDto);
		}
		return returnValue;
	}

	@Override
	public ProductDto getProductByProductId(String productId) {
		ProductEntity productEntity = productRepository.findByProductId(productId);
//		if(productEntity==null) throw new UsernameNotFoundException(productId);
		return new ModelMapper().map(productEntity, ProductDto.class);
	}

	@Override
	public ProductDto updateProduct(String productId, ProductDto productDetails) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		ProductEntity productEntity = productRepository.findByProductId(productId);
		ProductDto productDto = modelMapper.map(productEntity, ProductDto.class);
		
		productDto.setName(productDetails.getName());
		productDto.setDescription(productDetails.getDescription());
		
		ProductEntity product = modelMapper.map(productDto, ProductEntity.class);
		ProductEntity updatedProduct = productRepository.save(product);

		ProductDto returnValue = modelMapper.map(updatedProduct, ProductDto.class);
		return returnValue;
	}

	@Override
	public void deleteProduct(String productId) {
		ProductEntity productEntity = productRepository.findByProductId(productId);
		productRepository.delete(productEntity);
	}

}
