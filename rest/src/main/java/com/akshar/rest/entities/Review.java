package com.akshar.rest.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String reviewer;
    private String review;
    private String imageUrl;
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Review review1 = (Review) o;
        return Objects.equals(id, review1.id) && Objects.equals(reviewer, review1.reviewer) && Objects.equals(review, review1.review) && Objects.equals(imageUrl, review1.imageUrl) && Objects.equals(project, review1.project);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, reviewer, review, imageUrl, project);
    }
}
