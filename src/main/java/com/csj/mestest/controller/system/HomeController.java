package com.csj.mestest.controller.system;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.csj.mestest.dto.system.MenuDTO;
import com.csj.mestest.service.system.HomeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/")
public class HomeController {
    @Autowired
    private HomeService homeService;

    @GetMapping
    public String Home(){
        return "home/index";
    }

    @GetMapping("layout")
    public String Home(final Model model){
        //String user_id = principal.getName();
        //model.addAttribute("id", user_id);
        return "layout/layout";
    }

    @RequestMapping(value = "MenuList",  method = RequestMethod.GET)
	public @ResponseBody Object MenuList(HttpServletRequest request, HttpServletResponse response,
			HttpSession session) throws Throwable {
			
		//ModelAndView vie = new ModelAndView("system/jsonView");
		//vie.setViewName();
		HashMap<String, Object> params = new HashMap<String, Object>();

        List<MenuDTO> list = new ArrayList<MenuDTO>();
        
        list.addAll(homeService.GetMenus());
		
        HashMap<String, Object> modelMap = new HashMap<String, Object>();
		modelMap.put("rows", list);
		return list;
	}

}