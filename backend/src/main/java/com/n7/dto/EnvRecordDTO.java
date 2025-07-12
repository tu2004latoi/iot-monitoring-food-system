package com.n7.dto;

import lombok.Data;

@Data
public class EnvRecordDTO {
    private Float temperature;
    private Float humidity;
    private String deviceCode;
    private String timestamp;

}
