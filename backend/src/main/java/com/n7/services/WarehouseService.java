package com.n7.services;

import com.n7.pojo.Warehouse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface WarehouseService {
    Warehouse addWarehouse(Warehouse warehouse);
    List<Warehouse> getAllWarehouse();
    Warehouse getWarehouseById(int id);
    void deleteWarehouse(Warehouse warehouse);
}
