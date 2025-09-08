package com.example.CameraCheck.mapper.chart;

import com.example.CameraCheck.dto.chart.OsaRateDTO;
import com.example.CameraCheck.model.chart.ShelfModel;
import com.example.CameraCheck.model.chart.ShelfSnapshotModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = "spring")
public interface OsaRateMapper {
    @Mapping(target = "shelfName", source = "shelf.name")
    @Mapping(target = "labels", expression = "java(labelList(snapshot))")
    @Mapping(target = "osaRates", expression = "java(osaRateList(snapshot))")
    @Mapping(target = "threshold", constant = "40")
    OsaRateDTO toDto(ShelfModel shelfModel);

    default List<String> labelList(ShelfSnapshotModel snapshot) {
        return List.of(snapshot.getTimestamp().toString());
    }

    default List<Double> osaRateList(ShelfSnapshotModel snapshot) {
        if (snapshot.getExpectedItems() == 0) return List.of(0.0);
        return List.of((snapshot.getCurrentItems() * 100.0) / snapshot.getExpectedItems());
    }
}
