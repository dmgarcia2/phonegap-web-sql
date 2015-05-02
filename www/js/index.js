"use strict";

var db;

var phonegap = {};

phonegap.app = {
	
    initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        StatusBar.hide();
        FastClick.attach(document.body);

        db = window.openDatabase("Database", "1.0", "BD Students", 200000);
        db.transaction(phonegap.app.populateDB, phonegap.app.errorCB, phonegap.app.successCB);
    },

    populateDB: function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS STUDENTS');
        tx.executeSql('CREATE TABLE IF NOT EXISTS STUDENTS (name unique, results)');
        tx.executeSql('INSERT INTO STUDENTS (name, results) VALUES ("Student 1", 6.75)');
        tx.executeSql('INSERT INTO STUDENTS (name, results) VALUES ("Student 2", 6.75)');
        tx.executeSql('INSERT INTO STUDENTS (name, results) VALUES ("Student 3", 7.75)');
        tx.executeSql('INSERT INTO STUDENTS (name, results) VALUES ("Student 4", 8.75)');
        tx.executeSql('INSERT INTO STUDENTS (name, results) VALUES ("Student 5", 9.75)');
        tx.executeSql('INSERT INTO STUDENTS (name, results) VALUES ("Student 6", 1.75)');
        tx.executeSql('INSERT INTO STUDENTS (name, results) VALUES ("Student 7", 2.75)');
        tx.executeSql('INSERT INTO STUDENTS (name, results) VALUES ("Student 8", 3.75)');
    },

    successCB: function() {
        db.transaction(phonegap.app.queryDB, phonegap.app.errorCB);
    },

    queryDB: function(tx) {
        tx.executeSql('SELECT * FROM STUDENTS', [], phonegap.app.querySuccess, phonegap.app.errorCB);
    },

    querySuccess: function(tx, results) {
        var msg;
        var len = results.rows.length;
        console.log("STUDENTS: " + len + " rows.");

        $('#table').empty();
        for (var index = 0; index < len; index++) {
            var row = results.rows.item(index);
            $('#table').append('<li style="text-align: center;">' + row.name + ' - ' + row.results + '</li>');
        }

        $('#table').listview('refresh');
    },

    errorCB: function(err) {
        alert("Error processing SQL: " + err.code);
    }
};
