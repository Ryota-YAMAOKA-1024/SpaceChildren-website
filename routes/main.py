from flask import Blueprint, render_template

main_bp = Blueprint("main", __name__)


@main_bp.route("/")
def index():
    return render_template("index.html.j2")


@main_bp.route("/about")
def about():
    return render_template("about.html.j2")


@main_bp.route("/members")
def members():
    return render_template("members.html.j2")


@main_bp.route("/works")
def works():
    return render_template("works.html.j2")


@main_bp.route("/book-review")
def book_review():
    return render_template("book_review.html.j2")


@main_bp.route("/news")
def news():
    return render_template("news.html.j2")


@main_bp.route("/contact")
def contact():
    return render_template("contact.html.j2")
