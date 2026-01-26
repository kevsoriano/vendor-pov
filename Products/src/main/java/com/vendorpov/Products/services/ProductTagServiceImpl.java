package com.vendorpov.Products.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vendorpov.Products.data.ProductTagEntity;
import com.vendorpov.Products.data.ProductTagRepository;
import com.vendorpov.Products.shared.ProductTagDto;

@Service
public class ProductTagServiceImpl implements ProductTagService {
	@Autowired
	ProductTagRepository productTagRepository;
	@Autowired
	ModelMapper modelMapper;
	
	@Override
	public ProductTagDto createProductTag(ProductTagDto productTagDetails) {
		ProductTagEntity productTagEntity = modelMapper.map(productTagDetails, ProductTagEntity.class);
		productTagEntity.setExternalId(UUID.randomUUID().toString());
		productTagRepository.save(productTagEntity);
		
		ProductTagDto returnValue = modelMapper.map(productTagEntity, ProductTagDto.class);
		returnValue.setId(productTagEntity.getExternalId());
		
		return returnValue;
	}

	@Override
	public List<ProductTagDto> getProductTags(int page, int limit) {
		List<ProductTagDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<ProductTagEntity> productTagPage = productTagRepository.findAll(pageRequest);
		List<ProductTagEntity> productTags = productTagPage.getContent();
		for(ProductTagEntity productTag: productTags) {
			ProductTagDto productTagDto = modelMapper.map(productTag, ProductTagDto.class);
			productTagDto.setId(productTag.getExternalId());
			returnValue.add(productTagDto);
		}
		return returnValue;
	}

	@Override
	public List<ProductTagDto> getProductTagsWithProductCount(int page, int limit) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ProductTagDto getProductTagByExternalId(String id) {
		ProductTagEntity productTagEntity = productTagRepository.findByExternalId(id);
		ProductTagDto returnValue = modelMapper.map(productTagEntity, ProductTagDto.class);
		returnValue.setId(productTagEntity.getExternalId());
		return returnValue;
	}

	@Override
	public ProductTagDto updateProductTag(String id, ProductTagDto productTagDetails) {
		ProductTagEntity existingProductTag = productTagRepository.findByExternalId(id);

		existingProductTag.setName(productTagDetails.getName());

		ProductTagEntity updatedProductTag = productTagRepository.save(existingProductTag);

		ProductTagDto returnValue = modelMapper.map(updatedProductTag, ProductTagDto.class);
	    returnValue.setId(updatedProductTag.getExternalId());
	    
		return returnValue; 
	}

	@Override
	public void deleteProductTag(String id) {
		ProductTagEntity productTagEntity = productTagRepository.findByExternalId(id);
		productTagRepository.delete(productTagEntity);
	}

}
