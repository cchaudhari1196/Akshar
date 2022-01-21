package com.akshar.rest.entities;

import javax.persistence.*;

@Entity
@Table
public class Image {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String address;

    @Column
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_group_id", nullable = true)
    private ImageGroup imageGroup;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ImageGroup getImageGroup() {
        return imageGroup;
    }

    public void setImageGroup(ImageGroup imageGroup) {
        this.imageGroup = imageGroup;
        if(!imageGroup.getImages().contains(this))
            imageGroup.getImages().add(this);
    }
}
