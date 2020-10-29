package pl.demoapp.bm.Users;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Authorities {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user.username")
  private User user;
  private String authority;
}
