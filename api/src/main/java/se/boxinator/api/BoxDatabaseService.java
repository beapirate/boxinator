package se.boxinator.api;


import org.springframework.stereotype.Service;

@Service
public class BoxDatabaseService {

    public String ping() {
        return "pong";
    }
}