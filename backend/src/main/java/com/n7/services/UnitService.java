package com.n7.services;

import com.n7.pojo.Unit;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UnitService {
    Unit getUnitById(int id);
    Unit addUnit(Unit u);
    List<Unit> getAllUnits();
    void deleteUnit(Unit u);
}
