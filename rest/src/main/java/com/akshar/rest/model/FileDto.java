package com.akshar.rest.model;

public class FileDto {
    private String name;
    private String url;

    public FileDto(String name, String url) {
        this.name = name;
        this.url = url;
    }
    public FileDto(){}

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
