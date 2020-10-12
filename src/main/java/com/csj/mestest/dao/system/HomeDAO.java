package com.csj.mestest.dao.system;

import java.util.List;

import com.csj.mestest.dto.system.MenuDTO;
import com.csj.mestest.dto.system.UserDTO;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface HomeDAO {
    
    public List<UserDTO> GetUsers();

    public List<MenuDTO> GetMenus();
}
