package com.emeraldautoexchange.eaebackend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    public List<Vehicle> findAllByOrderByIdAsc();
}
