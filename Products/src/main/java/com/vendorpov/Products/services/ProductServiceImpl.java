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
import com.vendorpov.Products.data.ProductAttributeRepository;
import com.vendorpov.Products.data.ProductEntity;
import com.vendorpov.Products.data.ProductRepository;
import com.vendorpov.Products.data.ProductVariantEntity;
import com.vendorpov.Products.shared.ProductDto;

import jakarta.transaction.Transactional;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	ProductRepository productRepository;
	@Autowired
	ProductAttributeRepository productAttributeRepository;

	@Override
	@Transactional
	public ProductDto createProduct(ProductDto productDetails) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		ProductEntity productEntity = modelMapper.map(productDetails, ProductEntity.class);
		productEntity.setProductId(UUID.randomUUID().toString());
		
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

	            // Use a Set to ensure uniqueness in the join table
	            Set<ProductAttributeEntity> linkedAttributes = new HashSet<>();

	            if (variant.getProductAttributes() != null) {
	                for (ProductAttributeEntity dtoAttr : variant.getProductAttributes()) {
	                    // Initialize product attributes if null
	                    if (productEntity.getProductAttributes() == null) {
	                        productEntity.setProductAttributes(new ArrayList<>());
	                    }

	                    // Find existing attribute or use the new one from variant
	                    ProductAttributeEntity matchedAttr = productEntity.getProductAttributes().stream()
	                        .filter(a -> a.getAttributeKey() != null && a.getAttributeKey().equals(dtoAttr.getAttributeKey()) && 
	                                     a.getAttributeValue() != null && a.getAttributeValue().equals(dtoAttr.getAttributeValue()))
	                        .findFirst()
	                        .orElse(null);

	                    if (matchedAttr == null) {
	                        // Not found, so we adopt this attribute into the Product
	                        matchedAttr = dtoAttr;
	                        matchedAttr.setProduct(productEntity);
	                        matchedAttr.setProductAttributeId(UUID.randomUUID().toString());
	                        productEntity.getProductAttributes().add(matchedAttr);
	                    }

	                    linkedAttributes.add(matchedAttr);
	                    
	                    // Set inverse side
	                    if (matchedAttr.getProductVariants() == null) {
	                        matchedAttr.setProductVariants(new ArrayList<>());
	                    }
	                    matchedAttr.getProductVariants().add(variant);
	                }
	            }
	            // Set the linked attributes back to the variant
	            variant.setProductAttributes(linkedAttributes);
	        }
	    }
		
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
