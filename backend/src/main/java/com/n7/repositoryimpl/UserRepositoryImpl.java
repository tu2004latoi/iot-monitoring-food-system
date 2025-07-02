//package com.n7.repositoryimpl;
//
//import com.n7.pojo.User;
//import com.n7.repositories.UserRepository;
//import jakarta.persistence.Query;
//import jakarta.transaction.Transactional;
//import org.hibernate.Session;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//@Transactional
//public class UserRepositoryImpl implements UserRepository {
//
//    @Autowired
//    private LocalSessionFactoryBean factory;
//
//
//    @Override
//    public User addOrUpdateUser(User u) {
//        Session s = this.factory.getObject().getCurrentSession();
//        if (u.getUserId()==null){
//            s.persist(u);
//        } else {
//            s.merge(u);
//        }
//
//        return u;
//    }
//
//    @Override
//    public User getUserByUsername(String username) {
//        Session s = this.factory.getObject().getCurrentSession();
//        Query q = s.createNamedQuery("User.findByUsername", User.class);
//        q.setParameter("username", username);
//
//        return (User) q;
//    }
//
//    @Override
//    public User getUserByUserId(int id) {
//        Session s = this.factory.getObject().getCurrentSession();
//        Query q = s.createNamedQuery("User.findByUserId", User.class);
//        q.setParameter("userId", id);
//
//        return (User) q;
//    }
//
//    @Override
//    public List<User> getAllUsers() {
//        Session s = this.factory.getObject().getCurrentSession();
//        Query q = s.createQuery("FROM User", User.class);
//
//        return q.getResultList();
//    }
//}
