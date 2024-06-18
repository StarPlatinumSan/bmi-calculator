"use strict";

$(document).ready(function () {
	/* ON READY */

	if ($("#imperialButton").is(":checked")) {
		showImperial();
	}

	$("input").val("");

	/* FUNCTIONS */

	function showImperial() {
		$(".metricInput").hide();
		$(".imperialInput").css("display", "flex");
	}

	function showMetric() {
		$(".metricInput").show();
		$(".imperialInput").css("display", "none");
	}

	function bmiCalculateImperial() {
		let weightLbs = 0;
		let weightStones = 0;
		if ($("#lbs").val() !== "") {
			weightLbs = $("#lbs").val();
		}
		if ($("#st").val() !== "") {
			weightStones = $("#st").val();
		}

		$(".welcome").css("display", "none");
		$(".bmiTldr").css("display", "block");
		$(".bmiDescription").css("display", "block");

		let totalWeight = Math.round(parseFloat(weightStones) * 14) + parseFloat(weightLbs);
		let heightFeet = parseFloat($("#ft").val());
		let heightInches = parseFloat($("#in").val());
		let totalHeightInches = heightFeet * 12 + heightInches;

		let heightMeters = totalHeightInches * 0.0254;
		let minWeightLbs = 18.5 * (heightMeters * heightMeters) * 2.20462;
		let maxWeightLbs = 24.9 * (heightMeters * heightMeters) * 2.20462;

		let bmi = (totalWeight / (totalHeightInches * totalHeightInches)) * 703;
		bmi = Math.round(bmi * 100) / 100;

		if (!isFinite(bmi) || isNaN(bmi)) {
			$("#showBMI").text("0");
		} else {
			$("#showBMI").text(bmi);
		}

		if (bmi <= 24.9 && bmi >= 18.5) {
			$(".bmiSuggestion").html("<strong>healthy</strong>");
		} else {
			$(".bmiSuggestion").html("<strong>unhealthy</strong>");
		}

		$(".bmiIdeal").text(Math.round(minWeightLbs * 100) / 100 + " - " + Math.round(maxWeightLbs * 100) / 100 + " lbs");
	}

	function bmiCalculateMetric() {
		let height = $("#cm").val() / 100;
		let bmi = $("#kg").val() / Math.pow(height, 2);
		bmi = Math.round(bmi * 100) / 100;

		let minWeightKg = 18.5 * (height * height);
		let maxWeightKg = 24.9 * (height * height);

		$(".welcome").css("display", "none");
		$(".bmiTldr").css("display", "block");
		$(".bmiDescription").css("display", "block");

		if (!isFinite(bmi) || isNaN(bmi)) {
			$("#showBMI").text("0");
		} else {
			$("#showBMI").text(bmi);
		}

		if (bmi <= 24.9 && bmi >= 18.5) {
			$(".bmiSuggestion").html("<strong>healthy</strong>");
		} else {
			$(".bmiSuggestion").html("<strong>unhealthy</strong>");
		}

		$(".bmiIdeal").text(Math.round(minWeightKg * 100) / 100 + " - " + Math.round(maxWeightKg * 100) / 100 + " kg");
	}

	function errorInput(object, isError) {
		if (isError) {
			$(object).css("border", "1px solid red");
			$(object).siblings(".unit").css("color", "red");
		} else {
			$(object).css("border", "1px solid #345FF6");
			$(object).siblings(".unit").css("color", "#345FF6");
		}
	}

	function verifyInput(object) {
		let value = $(object).val();
		if (/^\d*\.?\d*$/.test(value)) {
			errorInput(object, false);

			if ($("#kg").val() !== "" && $("#cm").val() !== "") {
				bmiCalculateMetric();
			}
		} else {
			errorInput(object, true);
		}
	}

	function verifyInputImperial(object) {
		let value = $(object).val();

		if (/^\d*\.?\d*$/.test(value)) {
			errorInput(object, false);

			if ($("#ft").val() !== "" && $("#in").val() !== "" && ($("#st").val() !== "" || $("#lbs").val() !== "")) {
				bmiCalculateImperial();
			}
		} else {
			errorInput(object, true);
		}
	}

	/* EVENT LISTENERS */

	$("#imperialButton").change(function () {
		if ($(this).is(":checked")) {
			showImperial();
		}
	});

	$("#metricButton").change(function () {
		if ($(this).is(":checked")) {
			showMetric();
		}
	});

	$("#cm, #kg").on("input", function () {
		verifyInput(this);
	});

	$("#ft, #in, #st, #lbs").on("keyup", function () {
		verifyInputImperial(this);
	});

	$("input").on("input", function () {
		let maxLength = 7;
		if ($(this).val().length > maxLength) {
			$(this).val($(this).val().slice(0, maxLength));
		}
	});
});
