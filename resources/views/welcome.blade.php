@extends('layouts.app')
@section('content')
    @auth
    <div id="root"></div>
    @else    
    <div class="container">
        <div class="jumbotron">
            <h1 class="display-4">Welcome to Register Board!</h1>
            <p class="lead">This register board scaffold, awesome for performing student attendance.</p>
            <hr class="my-4">
            <p class="lead">
                <a class="btn btn-primary btn-lg" href="/login" role="button">Login</a>
                <a class="btn btn-primary btn-lg" href="/register" role="button">Register</a>
            </p>
        </div>
    </div>
    @endauth
    @endsection