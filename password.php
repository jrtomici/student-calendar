<!DOCTYPE html>

<?php

	session_start();

	if($_SESSION['sess_user'] === null){
		header("Location: login.php");
	}

	

	if(time() > $_SESSION['expire']){
		header("Location: logout.php");
	}
	else{
		$_SESSION['expire'] = time()+60;
	}

?>


<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Change Password</title>

    <!-- Bootstrap core CSS -->
    <link href="./StudentCalendar_files/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap theme -->
    <link href="./StudentCalendar_files/bootstrap-datetimepicker.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="./StudentCalendar_files/custom.css" rel="stylesheet">

</head>

<body role="document">

<!-- Fixed navbar -->
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                                <li><a href="assignments.php">Assignments </a></li>
                                <li><a href="redirect.php">Calendar </a></li>
                                <li><a href="forumredirect.php">Forum </a></li>

            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <?php $user = $_SESSION['sess_user'];
					print "$user";
					?> <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                                                
                        <li><a href="password.php">Change password</a></li>
                        <?php 
                        if($_SESSION['sess_acct']=="teacher"){
                        	print "<li><a href='classcode.php'>Change class code</a></li>";
                        }
						?>
                        <li role="separator" class="divider"></li>
                        <li><a href="logout.php"><i class="glyphicon glyphicon-log-out" aria-hidden="true"></i> Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav>

<script src="./StudentCalendar_files/jquery-3.2.1.min.js"></script>
<script src="./StudentCalendar_files/bootstrap.min.js"></script>
<script src="./StudentCalendar_files/moment.min.js"></script>
<script src="./StudentCalendar_files/bootstrap-datetimepicker.min.js"></script>
<script src="./StudentCalendar_files/jquery.form.min.js"></script>
<script src="./StudentCalendar_files/jquery.fs.dropper.js"></script>
<script src="./StudentCalendar_files/jquery.metadata.js"></script>
<script src="./StudentCalendar_files/jquery.tablesorter.js"></script>
<script src="./StudentCalendar_files/jquery.calendar-widget.js"></script>
<script src="./StudentCalendar_files/jquery-ui.min.js.download"></script>
<script src="./StudentCalendar_files/fullcalendar.js"></script>
<script src="./StudentCalendar_files/modal.js"></script>
<script src="./StudentCalendar_files/engine.js"></script>
<script src="./StudentCalendar_files/tinymce.min.js.download"></script>
<script src="./StudentCalendar_files/Chart.js.download"></script>

<div class="container theme-showcase" id="container" role="main">    <h1>Change password</h1>

<form action = "" method="post">
    <div class="row">
        <div class="col-sm-4">
            <div class="form-group">
                <label>Current password:</label>
                <input type="password" name="pass" class="form-control">
            </div>
            <hr>
            <div class="form-group">
                <label>New password:</label>
                <input type="password" name="newpass" class="form-control">
            </div>
            <div class="form-group">
                <label>Confirm new password:</label>
                <input type="password" name="newpass2" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary btn-lg" id="savebtn" name="submit">Save</button>
        </div>
    </div>

</form>

<?php
error_reporting(0);
if(isset($_POST["submit"])){

	$file = "data.txt";
	$fh = fopen($file,'r+');

	// string to put username and passwords
	$users = '';

	while(!feof($fh)) {

		$line = fgets($fh);

		list($user, $pass, $acct) = explode(';', $line);

		if(trim($user) == $_SESSION['sess_user']){
			$pw = trim($pass);
		}
	}
	fclose($fh);

	if(!empty($_POST['pass']) && !empty($_POST['newpass']) && !empty($_POST['newpass2']) && $_POST['newpass']==$_POST['newpass2'] && $_POST['pass']==$pw) {
		$oldpass=$_POST['pass'];
		$newpass=$_POST['newpass'];
		$newpass2=$_POST['newpass2'];
			
		$file = "data.txt";
		$fh = fopen($file,'r+');

		// string to put username and passwords
		$users = '';

		while(!feof($fh)) {

			$user = explode(';',fgets($fh));

			$username = trim($user[0]);
			$password = trim($user[1]);
			$account = trim($user[2]);

			// check for empty indexes
			if (!empty($username) && !empty($password)) {
				if ($username == $_SESSION['sess_user']) {
					$password = $_POST['newpass'];;
				}

				$users .= $username . ';' . $password . ';' . $account;
				$users .= "\r\n";
			 }
		}

		// using file_put_contents() instead of fwrite()
		file_put_contents('data.txt', $users);

		fclose($fh); 
		echo "Password change success";
	}
	else{
		echo "Wrong password/new passwords do not match";
	}
}

?>

</div>

</body></html>