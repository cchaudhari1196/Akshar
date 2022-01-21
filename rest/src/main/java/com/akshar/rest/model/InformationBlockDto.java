package com.akshar.rest.model;

import com.akshar.rest.entities.Information;
import com.akshar.rest.entities.InformationBlock;
import com.akshar.rest.entities.SubInformationBlock;

import java.util.ArrayList;
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

    public void addSubInformationBlocks(SubInformationBlockDto subInfoBlockDto) {
        if(subInformationBlocks == null)
            subInformationBlocks = new ArrayList<>();
        subInformationBlocks.add(subInfoBlockDto);
    }


    public InformationBlock toEntity(){
        InformationBlock informationBlock = new InformationBlock();
        informationBlock.setId(this.getId());
        informationBlock.setTitle(this.getTitle());

        for(SubInformationBlockDto subInfoBlockDto : this.getSubInformationBlocks()){
            SubInformationBlock subInfoBlock = new SubInformationBlock();
            subInfoBlock.setId(subInfoBlockDto.getId());
            subInfoBlock.setTitle(subInfoBlockDto.getTitle());
            subInfoBlock.setSubTitle(subInfoBlockDto.getSubTitle());

            for(InformationDto infoDto: subInfoBlockDto.getInformations()){
                Information info = new Information();
                info.setId(infoDto.getId());
                info.setDescription(infoDto.getDescription());
                subInfoBlock.addInformations(info);
            }
            informationBlock.addSubInformationBlocks(subInfoBlock);
        }
        return informationBlock;
    }

}
