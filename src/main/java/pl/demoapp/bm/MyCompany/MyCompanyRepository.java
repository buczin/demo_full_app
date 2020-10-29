package pl.demoapp.bm.MyCompany;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MyCompanyRepository extends JpaRepository<MyCompany, Long> {
  List<MyCompany> findAllByOrderByNameAsc();

  boolean existsByNip(String nip);
}
