package com.akshar.rest.mapper;

import com.akshar.rest.entities.Project;
import com.akshar.rest.model.ProjectDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProjectFromDto(ProjectDto dto, @MappingTarget Project entity);
}
