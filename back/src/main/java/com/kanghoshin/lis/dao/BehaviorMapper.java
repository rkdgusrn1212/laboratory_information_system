package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.behavior.ReadBehaviorListDto;
import com.kanghoshin.lis.vo.entity.BehaviorVo;

@Mapper
public interface BehaviorMapper {
	
	@Select("SELECT * FROM behavior WHERE behavior_code = #{behaviorCode}")
	BehaviorVo findByBehaviorCode(@Param("behaviorCode") String behaviorCode);
	
	@Select("<script>"
			+ "SELECT * FROM behavior "
			+ "<where> "
			+ "<if test ='readBehaviorListDto.behaviorCodeKey!=null'> "
			+ "behavior_code like CONCAT('%',#{readBehaviorListDto.behaviorCodeKey},'%') "
			+ "</if> "
			+ "<if test ='readBehaviorListDto.behaviorClassificationKey!=null'> "
			+ "AND behavior_classification like CONCAT('%',#{readBehaviorListDto.behaviorClassificationKey},'%') "
			+ "</if> "
			+ "<if test ='readBehaviorListDto.behaviorNameKrKey!=null'> "
			+ "AND behavior_name_kr like CONCAT('%',#{readBehaviorListDto.behaviorNameKrKey},'%') "
			+ "</if> "
			+ "<if test ='readBehaviorListDto.behaviorNameEnKey!=null'> "
			+ "AND behavior_name_en like CONCAT('%',#{readBehaviorListDto.behaviorNameEnKey},'%') "
			+ "</if> "
			+ "</where>"
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readBehaviorListDto.behaviorCodeOrder != null'> "
			+ " behavior_code ${readBehaviorListDto.behaviorCodeOrder} "
			+ "</if> "
			+ "<if test='readBehaviorListDto.behaviorClassificationOrder != null'> "
			+ ", behavior_classification ${readBehaviorListDto.behaviorClassificationOrder} "
			+ "</if> "
			+ "<if test='readBehaviorListDto.behaviorNameKrOrder != null'> "
			+ ", behavior_name_kr ${readBehaviorListDto.behaviorNameKrOrder} "
			+ "</if> "
			+ "<if test='readBehaviorListDto.behaviorNameEnOrder != null'> "
			+ ", behavior_name_en ${readBehaviorListDto.behaviorNameEnOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readBehaviorListDto.pageStart}, #{readBehaviorListDto.pageSize}"
			+ "</script>")
	BehaviorVo[] select(@Param("readBehaviorListDto") ReadBehaviorListDto readBehaviorListDto );
}
