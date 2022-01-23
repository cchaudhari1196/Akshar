package com.akshar.rest.controller;


import com.akshar.rest.model.FileDto;
import com.akshar.rest.service.FilesStorageService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class FilesController {

    @Autowired
    FilesStorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<FileDto> uploadFile(@RequestParam("file") MultipartFile file) throws FileUploadException {
        storageService.save(file);
        String message = "Uploaded the file successfully: " + file.getOriginalFilename();
        String filename = file.getOriginalFilename();
        String url = MvcUriComponentsBuilder
                .fromMethodName(FilesController.class, "getFile", filename).build().toString();

        return ResponseEntity.status(HttpStatus.OK).body(new FileDto(message,url));
    }

    @GetMapping("/files")
    public ResponseEntity<List<FileDto>> getListFiles() {
        List<FileDto> fileInfos = storageService.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FilesController.class, "getFile", path.getFileName().toString()).build().toString();

            return new FileDto(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                .contentType(MediaType.IMAGE_PNG).body(file);
    }
}