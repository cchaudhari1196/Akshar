package com.akshar.rest.controller;

import com.akshar.rest.model.ProjectDto;
import com.akshar.rest.service.ProjectService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectServiceImpl;

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProject(@PathVariable Long id){
        ProjectDto projectDto = projectServiceImpl.getProject(id);
        return new ResponseEntity<>(projectDto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody ProjectDto project){
        projectServiceImpl.createProject(project);
        return new ResponseEntity("Created", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        projectServiceImpl.deleteProject(id.longValue());
        return new ResponseEntity("Deleted id " + id, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity update(@RequestBody ProjectDto project){
        projectServiceImpl.updateProject(project);
        return new ResponseEntity("Updated id " + project.getId().toString(), HttpStatus.OK);
    }
}
