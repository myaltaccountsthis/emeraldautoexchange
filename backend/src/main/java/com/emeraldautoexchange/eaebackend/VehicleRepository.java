package com.emeraldautoexchange.eaebackend;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    List<String> columns = Arrays.stream(Vehicle.class.getFields()).map(Field::getName).toList();

    default List<String> getColumns() { return columns; }

    Page<Vehicle> findAll(Specification<Vehicle> specification, Pageable pageable);
}
