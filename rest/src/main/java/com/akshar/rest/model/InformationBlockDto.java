package com.akshar.rest.model;

import java.util.List;

public class InformationBlockDto {
    private Long id;
    private String title;
    private List<SubInformationBlockDto> subInformationBlocks;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<SubInformationBlockDto> getSubInformationBlocks() {
        return subInformationBlocks;
    }

    public void setSubInformationBlocks(List<SubInformationBlockDto> subInformationBlocks) {
        this.subInformationBlocks = subInformationBlocks;
    }
}
