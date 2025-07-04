package com.n7.serviceimpl;

import com.n7.pojo.Unit;
import com.n7.repositories.UnitRepository;
import com.n7.services.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UnitServiceImpl implements UnitService {
    @Autowired
    private UnitRepository unitRepo;


    @Override
    public Unit getUnitById(int id) {
        Optional<Unit> unit = this.unitRepo.findById(id);
        return unit.orElse(null);
    }
}
