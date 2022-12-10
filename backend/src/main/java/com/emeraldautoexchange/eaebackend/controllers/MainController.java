package com.emeraldautoexchange.eaebackend.controllers;

import com.emeraldautoexchange.eaebackend.Vehicle;
import com.emeraldautoexchange.eaebackend.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;

@RestController
public class MainController {
    @Autowired
    VehicleRepository repo;

    @GetMapping("/add/{num1}/{num2}")
    int add(@PathVariable int num1, @PathVariable int num2) {
        return num1 + num2;
    }

    @GetMapping("/inventory")
    Map<String, Object> getInventory(Optional<Integer> page, Optional<Integer> count, Optional<String> sort_by, Optional<String> query, Optional<String> makes, Optional<String> models, Optional<String> builds, Optional<String> years, Optional<Integer> minYear, Optional<Integer> maxYear, Optional<Integer> minMiles, Optional<Integer> maxMiles, Optional<Double> minPrice, Optional<Double> maxPrice) {
        Specification<Vehicle> spec = ((root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            makes.ifPresent(s -> predicates.add(root.get("make").in(Arrays.asList(makes.get().split(",")))));
            models.ifPresent(s -> predicates.add(root.get("model").in(Arrays.asList(models.get().split(",")))));
            builds.ifPresent(s -> predicates.add(root.get("build").in(Arrays.asList(builds.get().split(",")))));
            years.ifPresent(s -> predicates.add(root.get("year").in(Arrays.asList(years.get().split(",")))));

            minYear.ifPresent(p -> predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("year"), minYear.get())));
            maxYear.ifPresent(p -> predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("year"), maxYear.get())));

            minMiles.ifPresent(p -> predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("miles"), minMiles.get())));
            maxMiles.ifPresent(p -> predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("miles"), maxMiles.get())));

            minPrice.ifPresent(p -> predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), minPrice.get())));
            maxPrice.ifPresent(p -> predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice.get())));
            query.ifPresent(q -> predicates.add(criteriaBuilder.isTrue(criteriaBuilder.function("query_match", Boolean.class, criteriaBuilder.concat(root.get("year"), criteriaBuilder.concat(" ", criteriaBuilder.concat(root.get("make"), criteriaBuilder.concat(" ", criteriaBuilder.concat(root.get("model"), criteriaBuilder.concat(" ", root.get("build"))))))), criteriaBuilder.literal(query.get())))));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        Sort sort = Sort.unsorted();
        Integer countValue = null;
        Integer pageValue = null;

        if (sort_by.isPresent()) {
            String sortValue = sort_by.get();
            if(sortValue.length() > 0) {
                String col = sortValue.charAt(0) == ' ' || sortValue.charAt(0) == '-' || sortValue.charAt(0) == '+' ? sortValue.substring(1) : sortValue;
                if (repo.getColumns().contains(col))
                    sort = Sort.by(sortValue.charAt(0) == '-' ? Sort.Direction.DESC : Sort.Direction.ASC, col);
            }
        }

        if(page.isPresent()) {
            pageValue = page.get();
            if(pageValue > 0) {
                if(count.isEmpty()) {
                    countValue = 30;
                }
                else if(count.get() < 0) {
                    countValue = 30;
                }
                else {
                    countValue = count.get();
                }
            }
            else pageValue = 1;
        }
        else pageValue = 1;

        if(countValue == null) {
            countValue = count.orElse(Integer.MAX_VALUE);
        }
        if(countValue < 0) {
            countValue = Integer.MAX_VALUE;
        }


        Page<Vehicle> pg = repo.findAll(spec, PageRequest.of(pageValue - 1, countValue, sort.isEmpty() ? Sort.by(Sort.Direction.ASC, "id") : sort));


        Map<String, Object> data = new LinkedHashMap<>();
        data.put("count", pg.getNumberOfElements());
        data.put("totalCount", pg.getTotalElements());
        data.put("page", pg.getNumber() + 1);
        data.put("totalPages", pg.getTotalPages());
        if(sort.isSorted()) {
            Sort.Order order = sort.get().findFirst().get();
            data.put("sort", Map.of("property", order.getProperty(), "direction", order.getDirection()));
        }
        data.put("data", pg.stream().toList());
        return data;
    }

}
