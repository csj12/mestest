package com.csj.mestest.service.system;

import java.util.List;

import com.csj.mestest.dao.system.HomeDAO;
import com.csj.mestest.dto.system.MenuDTO;
import com.csj.mestest.dto.system.UserDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeService {

    @Autowired
    private HomeDAO homeDao;

    public List<UserDTO> GetUsers(){
        return homeDao.GetUsers();
    } 
    
    public List<MenuDTO> GetMenus(){
        return homeDao.GetMenus();
    }
}