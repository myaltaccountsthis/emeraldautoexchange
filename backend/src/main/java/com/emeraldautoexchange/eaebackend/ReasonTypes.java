package com.emeraldautoexchange.eaebackend;

public class ReasonTypes {
    private static final String buy = "I want to buy a car";
    private static final String sell = "I want to sell my car";
    private static final String exchange = "I want to exchange my car";
    private static final String other = "Other";

    public static int getId(String reason) {
        return switch (reason) {
            case buy -> 1;
            case sell -> 2;
            case exchange -> 3;
            default -> 4;
        };
    }

    public static String getReason(int id) {
        return switch (id) {
            case 1 -> buy;
            case 2 -> sell;
            case 3 -> exchange;
            default -> other;
        };
    }
}
