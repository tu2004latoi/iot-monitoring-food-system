package com.n7.controllers;

import com.n7.pojo.Unit;
import com.n7.services.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiUnitController {
    @Autowired
    private UnitService unitService;

    @GetMapping("/units")
    public ResponseEntity<List<Unit>> getAllUnits(){
        return ResponseEntity.ok(this.unitService.getAllUnits());
    }

    @GetMapping("/units/{id}")
    public ResponseEntity<Unit> getUnitById(@PathVariable int id){
        return ResponseEntity.ok(this.unitService.getUnitById(id));
    }

    @PostMapping("/units/add")
    public ResponseEntity<Unit> addUnit(@ModelAttribute Unit u){
        return ResponseEntity.ok(this.unitService.addUnit(u));
    }

    @DeleteMapping("/units/{id}")
    public ResponseEntity<String> deleteUnit(@PathVariable int id){
        Unit u = this.unitService.getUnitById(id);
        this.unitService.deleteUnit(u);
        return ResponseEntity.ok("ok");
    }
}
