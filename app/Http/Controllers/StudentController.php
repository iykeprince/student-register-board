<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Student;

class StudentController extends Controller
{
    public function index(){
        $students = Student::all();
        return response()->json($students, 200);
    }
    public function store(Request $request){
        $validated = $request->validate( [
            'name' => 'required',
            'level' => 'required'
        ]);

        $student = Student::create([
            'name' => $request->name,
            'level' => $request->level
        ]);
        
        return response()->json(['message' => 'Student created successfully!', 'student' => $student], 200);
    }

    public function show($id){
        $student = Student::findOrFail($id);
        return response()->json($student, 200);
    }

    public function destroy($id){
        return response()->json('deletion coming soon', 200);
    }

    public function updateRegister(Request $request){
        
        $validatedData = $request->validate([
            'ids' => 'required'
        ]);
        $ids = $request->ids;
        $presentFlag = $request->present;
        $absenceFlag = $request->absent;

        $students = Student::all();
        $selectedStudent = Student::find([...$ids]);
        foreach($selectedStudent as $student){
            $noOfPresents = ($student->presents) + 1;
            $noOfAbsents = ($student->absences) + 1;
        
            $student->presents = $presentFlag ? $noOfPresents : $student->presents;
            $student->absences = $absenceFlag ? $noOfAbsents : $student->absences;
               
            $student->save();
        }
            
        $notSelectedStudents = Student::select('*')->whereNotIn('id',[...$ids])->get();
        
        foreach($notSelectedStudents as $student){
            $noOfPresents = ($student->presents) + 1;
            $noOfAbsents = ($student->absences) + 1;

            $student->presents = $presentFlag ? $student->presents : $noOfPresents;
            $student->absences = $absenceFlag ? $student->absences : $noOfAbsents;
               
           $student->save();
        }

        return response()->json(['message' => 'Register marked'], 200);
    }
}
