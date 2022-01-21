package com.akshar.rest.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class ImageGroup {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    /*Commented is the unidirectional one to many realtionship.*/
//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "image_group_id", referencedColumnName = "id", nullable = false)

    /**
     * For info- src\main\resources\WhatWeLearn\hiberanate.txt
     */
    @OneToMany(mappedBy = "imageGroup", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();

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

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public void addImage(Image image) {
        if (this.images == null)
            this.images = new ArrayList<>();
        this.images.add(image);
        if (image.getImageGroup() != this)
            image.setImageGroup(this);
    }

    public void removeImage(Image image) {
        if (this.images == null)
            return;
        this.images.remove(image);
        image.setImageGroup(null);
    }

}
