'use strict';
// jshint expr:true
var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect;
chai.should();

describe('sinon tests', function() {
    var student, schedule;

    beforeEach(function () {
        student = {
            dropClass: function(classId, cb) {
                // do stuff
                if(!!cb.dropClass) {
                    cb.dropClass();
                } else {
                    cb();
                }
            }
        }

        schedule = {
            dropClass: function() {
                console.log('class dropped');
            }
        }
    });

    describe('student.dropClass', function() {
        it('should call the callback', function() {
            var spy = sinon.spy();

            student.dropClass(1, spy);
            spy.called.should.be.true;
        });

        it('should call the callback and log to the console', function() {
            function onClassDropped() {
                console.log('onClassDropped was called');
            }
            var spy = sinon.spy(onClassDropped);
            student.dropClass(1, spy);
            spy.called.should.be.true;
        });

        it('should call the callback eeven if its a method of an object', function() {
            sinon.spy(schedule, 'dropClass');
            student.dropClass(1, schedule);
            schedule.dropClass.called.should.be.true;
        });
    })
})