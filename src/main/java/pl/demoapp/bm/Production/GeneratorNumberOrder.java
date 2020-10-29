package pl.demoapp.bm.Production;

import lombok.SneakyThrows;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class GeneratorNumberOrder implements IdentifierGenerator {

  @SneakyThrows
  @Override
  public Serializable generate(SharedSessionContractImplementor session, Object o) throws HibernateException {
    Connection connection = session.connection();
    LocalDateTime date = LocalDateTime.now();
    DateTimeFormatter formate = DateTimeFormatter.ofPattern("MMyy");

    Statement statement = connection.createStatement();
    ResultSet res = statement.executeQuery("SELECT LEFT(`order_number`,LENGTH(`order_number`)-4) as orders FROM `production_order` WHERE MONTH(`date_created_order`) = MONTH(NOW()) ORDER BY ABS(`order_number`) DESC LIMIT 1");

    System.out.println(res.getInt(1));

    if (res.next()) {
      return (res.getInt(1) + 1) + formate.format(date);
    } else {
      return "1" + formate.format(date);
    }
  }
}
