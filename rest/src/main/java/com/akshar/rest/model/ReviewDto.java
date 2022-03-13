package com.akshar.rest.model;

import com.akshar.rest.entities.Review;

public class ReviewDto {
    private Long id;
    private String reviewer;
    private String review;
    private String imageUrl;
    private String title;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReviewer() {
        return reviewer;
    }

    public void setReviewer(String reviewer) {
        this.reviewer = reviewer;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Review createEntity(){
        Review review = new Review();
        review.setId(this.id);
        review.setReview(this.getReview());
        review.setReviewer(this.reviewer);
        review.setImageUrl(this.imageUrl);
        review.setTitle(this.title);
        return review;
    }

    public static ReviewDto createModel(Review review){
        var reviewDto = new ReviewDto();
        reviewDto.setReview(review.getReview());
        reviewDto.setId(review.getId());
        reviewDto.setReviewer(review.getReviewer());
        reviewDto.setImageUrl(review.getImageUrl());
        reviewDto.setTitle(review.getTitle());
        return reviewDto;
    }
}
