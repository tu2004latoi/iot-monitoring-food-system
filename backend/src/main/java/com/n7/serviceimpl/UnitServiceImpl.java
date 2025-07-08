package com.n7.serviceimpl;

import com.n7.pojo.Unit;
import com.n7.repositories.UnitRepository;
import com.n7.services.UnitService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    @Override
    @Transactional
    public Unit addUnit(Unit u) {
        return this.unitRepo.save(u);
    }

    @Override
    @Transactional
    public List<Unit> getAllUnits() {
        return this.unitRepo.findAll();
    }

    @Override
    public void deleteUnit(Unit u) {
        this.unitRepo.delete(u);
    }
}
