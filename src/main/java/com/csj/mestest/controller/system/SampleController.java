package com.csj.mestest.controller.system;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SampleController {
    
    @GetMapping(value="/hello")
    public String getMethodName() {
        return "Hello World!!";
    }
}
