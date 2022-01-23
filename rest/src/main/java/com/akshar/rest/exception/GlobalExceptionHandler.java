package com.akshar.rest.exception;

import com.akshar.rest.model.FileDto;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = BadCredentialsException.class)
    public ResponseEntity blogNotFoundException(BadCredentialsException badCredentialsException) {
        return new ResponseEntity("Please, Login with correct credentials", HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleMaxSizeException(MaxUploadSizeExceededException exc) {
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("File too large!");
    }

    @ExceptionHandler(FileUploadException.class)
    public ResponseEntity<String> handleImageUploadFailed(FileUploadException exc) {
        String message = "Could not upload the file: " +exc.getMessage();
        return ResponseEntity.status(HttpStatus.CONFLICT).body(message);
    }
}
