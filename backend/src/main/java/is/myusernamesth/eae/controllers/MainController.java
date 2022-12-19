package is.myusernamesth.eae.controllers;

import is.myusernamesth.eae.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.Predicate;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MainController {
    @Autowired
    VehicleRepository repo;

    @Autowired
    MakeRepository makes;

    @Autowired
    BuildRepository builds;

    @Autowired
    ContactFormRepository forms;

    @CrossOrigin(origins = {"https://myaltaccountsthis.github.io/","https://eae.myusernamesth.is/", "http://localhost:3000/"})
    @GetMapping(value = "/inventory", produces = MediaType.APPLICATION_JSON_VALUE)
    Map<String, Object> getInventory(@RequestParam Map<String, String> parameters) {
        final Map<String, String> params = parameters.entrySet().stream().collect(Collectors.toMap(e -> e.getKey().toLowerCase(), Map.Entry::getValue));
        Specification<Vehicle> spec = ((root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            for (String col : VehicleRepository.columns) {
                if(params.containsKey(col + "s")) {
                    predicates.add(criteriaBuilder.lower(root.get(col)).in(Arrays.asList(params.get(col + "s").toLowerCase().split(","))));
                }
                if(params.containsKey("min_" + col)) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get(col), params.get("min_" + col)));
                }
                if(params.containsKey("max_" + col)) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get(col), params.get("max_" + col)));
                }
            }
            if(params.containsKey("query")) {
                predicates.add(criteriaBuilder.isTrue(criteriaBuilder.function("query_match", Boolean.class, criteriaBuilder.concat(root.get("year"), criteriaBuilder.concat(" ", criteriaBuilder.concat(root.get("make"), criteriaBuilder.concat(" ", criteriaBuilder.concat(root.get("model"), criteriaBuilder.concat(" ", root.get("build"))))))), criteriaBuilder.literal(params.get("query")))));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        Sort sort = Sort.unsorted();
        Integer countValue = null;
        Integer pageValue = null;

        if (params.containsKey("sort_by")) {
            String sortValue = params.get("sort_by");
            if(sortValue.length() > 0) {
                String col = sortValue.charAt(0) == ' ' || sortValue.charAt(0) == '-' || sortValue.charAt(0) == '+' ? sortValue.substring(1) : sortValue;
                if (repo.getColumns().contains(col)) {
                    sort = Sort.by(sortValue.charAt(0) == '-' ? Sort.Direction.DESC : Sort.Direction.ASC, col);
                    if(!col.equals("id")) sort = sort.and(Sort.by("id"));
                }
            }
        }

        if(params.containsKey("page")) {
            if(params.get("page").matches("[+]?[0-9]+")) {
                pageValue = Integer.parseInt(params.get("page"));
                if(pageValue > 0) {
                    if(!params.containsKey("count")) {
                        countValue = 30;
                    }
                    else if(!params.get("count").matches("[+]?[0-9]+")) {
                        countValue = 30;
                    }
                    else {
                        countValue = Integer.parseInt(params.get("count"));
                        if(countValue < 0) countValue = 30;
                    }
                }
                else pageValue = 1;
            }
            else pageValue = 1;
        }
        else pageValue = 1;

        if(countValue == null) {
            if(params.containsKey("count")) {
                if(params.get("count").matches("[+]?[0-9]+")) {
                    countValue = Integer.parseInt(params.get("count"));
                    if(countValue < 0) countValue = Integer.MAX_VALUE;
                }
                else countValue = Integer.MAX_VALUE;
            }
            else countValue = Integer.MAX_VALUE;
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

    @CrossOrigin(origins={"https://myaltaccountsthis.github.io/","https://eae.myusernamesth.is/", "http://localhost:3000/"})
    @GetMapping(value = "/get-makes", produces = MediaType.APPLICATION_JSON_VALUE)
    List<Make> getMakes() {
        return makes.findAll(Sort.by("id"));
    }

    @CrossOrigin(origins={"https://myaltaccountsthis.github.io/","https://eae.myusernamesth.is/", "http://localhost:3000/"})
    @GetMapping(value = "/get-builds", produces = MediaType.APPLICATION_JSON_VALUE)
    List<Build> getBuilds() {
        return builds.findAll(Sort.by("id"));
    }

    /*
    @GetMapping("get-make-models")

     */

    @CrossOrigin(origins={"https://myaltaccountsthis.github.io/","https://eae.myusernamesth.is/", "http://localhost:3000/"})
    @PostMapping(value = "/contact", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    void contact(ContactForm form) {
        forms.saveAndFlush(form);
    }

    @CrossOrigin(origins={"https://myaltaccountsthis.github.io/","https://eae.myusernamesth.is/", "http://localhost:3000/"})
    @GetMapping(value = "/management/get-contact-forms", produces = MediaType.APPLICATION_JSON_VALUE)
    List<ContactForm> getContactForms() {
        return forms.findAll();
    }

    @CrossOrigin(origins={"https://myaltaccountsthis.github.io/","https://eae.myusernamesth.is/", "http://localhost:3000/"})
    @PostMapping(value = "/management/reset-contact-forms")
    void resetContactForms() {
        forms.wipe();
    }
}
