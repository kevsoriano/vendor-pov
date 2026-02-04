//package com.vendorpov.Products.services;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.UUID;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import com.vendorpov.Products.data.BrandEntity;
//import com.vendorpov.Products.data.BrandRepository;
//import com.vendorpov.Products.shared.BrandDto;
//import com.vendorpov.Products.shared.ProductCountDto;
//
//@Service
//public class BrandServiceImpl implements BrandService {
//	@Autowired
//	BrandRepository brandRepository;
//	@Autowired
//    private ModelMapper modelMapper;
//
//	@Override
//	public List<BrandDto> getBrands(int page, int limit) {
//		List<BrandDto> returnValue = new ArrayList<>();
//		Pageable pageRequest = PageRequest.of(page, limit);
//		Page<BrandEntity> brandPage = brandRepository.findAll(pageRequest);
//		List<BrandEntity> brands = brandPage.getContent();
//		for(BrandEntity brand: brands) {
//			BrandDto brandDto = modelMapper.map(brand, BrandDto.class);
//			brandDto.setId(brand.getExternalId());
//			returnValue.add(brandDto);
//		}
//		return returnValue;
//	}
//
//	@Override
//	public BrandDto createBrand(BrandDto brandTagDetails) {
//		BrandEntity brandEntity = modelMapper.map(brandTagDetails, BrandEntity.class);
//		brandEntity.setExternalId(UUID.randomUUID().toString());
//		brandRepository.save(brandEntity);
//		
//		BrandDto returnValue = modelMapper.map(brandEntity, BrandDto.class);
//		returnValue.setId(brandEntity.getExternalId());
//		
//		return returnValue;
//	}
//
//	@Override
//	public BrandDto getBrandByExternalId(String id) {
//		BrandEntity brandEntity = brandRepository.findByExternalId(id);
////		if(brandEntity==null) throw new UsernameNotFoundException(id);
//		BrandDto returnValue = modelMapper.map(brandEntity, BrandDto.class);
//		returnValue.setId(brandEntity.getExternalId());
//		return returnValue;
//	}
//
//	@Override
//	public BrandDto updateBrand(String id, BrandDto brandTagDetails) {
//		BrandEntity existingBrand = brandRepository.findByExternalId(id);
//
//		existingBrand.setName(brandTagDetails.getName());
//
//		BrandEntity updatedBrand = brandRepository.save(existingBrand);
//
//		BrandDto returnValue = modelMapper.map(updatedBrand, BrandDto.class);
//	    returnValue.setId(updatedBrand.getExternalId());
//	    
//		return returnValue; 
//	}
//
//	@Override
//	public void deleteBrand(String id) {
//		BrandEntity brandEntity = brandRepository.findByExternalId(id);
//		brandRepository.delete(brandEntity);
//	}
//
//	@Override
//	public List<ProductCountDto> getBrandsWithProductCount(int page, int limit) {
//		Pageable pageRequest = PageRequest.of(page, limit);
//		Page<ProductCountDto> brandPage = brandRepository.findAllBrandsWithProductCounts(pageRequest);
//		List<ProductCountDto> brands = brandPage.getContent();
//		return brands;
//	}
//
//}
