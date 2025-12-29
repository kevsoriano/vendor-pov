package com.vendorpov.Products.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vendorpov.Products.data.ProductEntity;
import com.vendorpov.Products.data.ProductRepository;
import com.vendorpov.Products.shared.ProductAttributeDto;
import com.vendorpov.Products.shared.ProductDto;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	ProductRepository productRepository;

	@Override
	public ProductDto createProduct(ProductDto productDetails) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		ProductEntity productEntity = modelMapper.map(productDetails, ProductEntity.class);
		productEntity.setProductId(UUID.randomUUID().toString());
		
//		for(int i=0; i<productDetails.getProductAttributes().size();i++) {
//			ProductAttributeDto productAttribute = productDetails.getProductAttributes().get(i);
//			productAttribute.setProduct(productDetails);
//			productAttribute.setProductAttributeId(UUID.randomUUID().toString());
//			
//			
//			productDetails.getProductAttributes().set(i,productAttribute);
//		}
		
		if (productEntity.getProductAttributes() != null) {
	        productEntity.getProductAttributes().forEach(attribute -> {
	            attribute.setProductAttributeId(UUID.randomUUID().toString());
	            attribute.setProduct(productEntity); // Link to parent Entity
	        });
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
