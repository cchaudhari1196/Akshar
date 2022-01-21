package com.akshar.rest.model;

import com.akshar.rest.entities.Image;
import com.akshar.rest.entities.ImageGroup;

import java.util.ArrayList;
import java.util.List;

public class ImageGroupDto {
    private Long id;
    private String name;
    private List<ImageDto> images = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ImageDto> getImages() {
        return images;
    }

    public void setImages(List<ImageDto> images) {
        this.images = images;
    }

    public void addImages(ImageDto image) {
        this.images.add(image);
    }

    public ImageGroup createImageGroup(){
        ImageGroup ig = new ImageGroup();
        ig.setId(this.getId());
        ig.setName(this.getName());
        for(ImageDto imageDto: this.getImages()){
            Image image = new Image();
            image.setId(imageDto.getId());
            image.setName(imageDto.getName());
            image.setAddress(imageDto.getAddress());
            image.setDescription(imageDto.getDescription());
            ig.addImage(image);
        }
        return ig;
    }
}
