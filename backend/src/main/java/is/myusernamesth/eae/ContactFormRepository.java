package is.myusernamesth.eae;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;

public interface ContactFormRepository extends JpaRepository<ContactForm, Integer> {

    @Modifying
    @Query(value = "TRUNCATE contact_forms RESTART IDENTITY; ALTER SEQUENCE hibernate_sequence RESTART WITH 1;", nativeQuery = true)
    void wipe();
}
