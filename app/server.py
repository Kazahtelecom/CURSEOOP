from __future__ import annotations

import json
import subprocess
import sys
import threading
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
MAX_SOURCE = 12_000
TIME_LIMIT = 4

RUNNER = r"""
import ast
import contextlib
import io
import json
import sys

payload = json.loads(sys.stdin.read())
source = payload.get("source", "")
exercise = payload.get("exercise", "")
results = []

class LimitedOutput(io.StringIO):
    def write(self, value):
        if self.tell() + len(value) > 20000:
            raise RuntimeError("Вывод слишком большой. Убери повторяющуюся печать.")
        return super().write(value)

class RestrictedSyntax(Exception):
    pass

allowed_nodes = {
    ast.Module, ast.ClassDef, ast.FunctionDef, ast.arguments, ast.arg,
    ast.Assign, ast.AnnAssign, ast.AugAssign, ast.Return, ast.Expr, ast.Pass,
    ast.Name, ast.Load, ast.Store, ast.Attribute, ast.Call, ast.keyword,
    ast.Constant, ast.List, ast.Tuple, ast.Dict, ast.Set, ast.Subscript, ast.Slice,
    ast.If, ast.For, ast.Compare, ast.BoolOp, ast.UnaryOp, ast.BinOp, ast.IfExp,
    ast.Add, ast.Sub, ast.Mod, ast.Eq, ast.NotEq, ast.Lt, ast.LtE, ast.Gt, ast.GtE,
    ast.Is, ast.IsNot, ast.In, ast.NotIn, ast.And, ast.Or, ast.Not, ast.USub,
    ast.UAdd, ast.JoinedStr, ast.FormattedValue, ast.Assert,
}
blocked_names = {
    "eval", "exec", "open", "compile", "input", "breakpoint", "globals", "locals",
    "vars", "getattr", "setattr", "delattr", "__import__",
}

def safe_range(*args):
    values = range(*args)
    if len(values) > 10000:
        raise ValueError("В этом упражнении цикл ограничен 10 000 шагами.")
    return values

def check_syntax(tree):
    for node in ast.walk(tree):
        if type(node) not in allowed_nodes:
            raise RestrictedSyntax("Этот вид Python-конструкции пока не поддерживается в учебной проверке: " + type(node).__name__)
        if isinstance(node, ast.Name):
            if node.id.startswith("_") or node.id in blocked_names:
                raise RestrictedSyntax("Имя " + node.id + " пока не поддерживается в учебной проверке.")
        if isinstance(node, ast.FunctionDef):
            if node.name.startswith("_") and node.name != "__init__":
                raise RestrictedSyntax("Из специальных методов курса поддерживается только __init__.")
            if node.decorator_list:
                raise RestrictedSyntax("Декораторы пока не входят в курс.")
        if isinstance(node, ast.ClassDef) and (node.decorator_list or node.keywords):
            raise RestrictedSyntax("Используй обычное объявление класса без дополнительных настроек.")
        if isinstance(node, ast.Attribute) and node.attr.startswith("_"):
            is_super_init = (
                node.attr == "__init__"
                and isinstance(node.value, ast.Call)
                and isinstance(node.value.func, ast.Name)
                and node.value.func.id == "super"
            )
            if not is_super_init:
                raise RestrictedSyntax("Обращение к специальным атрибутам пока не входит в курс.")
        if isinstance(node, ast.Constant):
            if isinstance(node.value, (int, float)) and abs(node.value) > 100000:
                raise RestrictedSyntax("Используй небольшие числа в учебном решении.")
            if isinstance(node.value, str) and len(node.value) > 2000:
                raise RestrictedSyntax("Строка слишком длинная для учебного задания.")

def record(label, hint, check):
    try:
        check()
        results.append({"label": label, "ok": True, "hint": "Условие выполнено."})
    except Exception:
        results.append({"label": label, "ok": False, "hint": hint})

output = LimitedOutput()
saved_stdout = sys.stdout
sys.stdout = output
try:
    if not source.strip():
        raise ValueError("Добавь своё решение в поле кода и повтори проверку.")
    tree = ast.parse(source)
    check_syntax(tree)
    safe_builtins = {
        "__build_class__": __build_class__,
        "object": object, "super": super, "print": print, "len": len,
        "range": safe_range, "str": str, "int": int, "float": float,
        "bool": bool, "list": list, "tuple": tuple, "dict": dict, "set": set,
        "enumerate": enumerate, "zip": zip, "min": min, "max": max, "sum": sum,
        "abs": abs, "round": round, "isinstance": isinstance, "issubclass": issubclass,
    }
    namespace = {"__builtins__": safe_builtins, "__name__": "course_solution"}
    exec(compile(tree, "<твоё решение>", "exec"), namespace, namespace)

    if exercise == "practice1":
        def create_books():
            cls = namespace.get("Book")
            assert isinstance(cls, type)
            first = cls("Дюна", "Автор 1")
            second = cls("Матильда", "Автор 2")
            assert first.title == "Дюна" and first.author == "Автор 1"
            assert second.title == "Матильда" and second.author == "Автор 2"
        record("Книги создаются с нужными данными", "Проверь класс Book и параметры __init__: название и автор должны сохраняться в self.", create_books)

        def independent_state():
            cls = namespace.get("Book")
            first = cls("Первая", "Автор")
            second = cls("Вторая", "Автор")
            first.is_read = True
            assert first.is_read is True and second.is_read is False
        record("Состояние книг независимое", "У каждой книги должно быть собственное значение is_read, заданное через self.", independent_state)

        def mark_method():
            cls = namespace.get("Book")
            book = cls("Книга", "Автор")
            assert callable(getattr(book, "mark_as_read", None))
            book.mark_as_read()
            assert book.is_read is True
        record("Метод отмечает выбранную книгу", "Добавь mark_as_read(self) и измени внутри него self.is_read на True.", mark_method)

    elif exercise == "practice2":
        def empty_list():
            book_cls = namespace.get("Book")
            list_cls = namespace.get("ReadingList")
            assert isinstance(book_cls, type) and isinstance(list_cls, type)
            reading_list = list_cls()
            assert reading_list.books == []
            assert reading_list.unread_books() == []
        record("Новый список пустой", "Проверь __init__ у ReadingList: books должен начинаться как пустой список.", empty_list)

        def add_books():
            book_cls = namespace.get("Book")
            list_cls = namespace.get("ReadingList")
            reading_list = list_cls()
            reading_list.add_book(book_cls("Дюна", "Автор"))
            reading_list.add_book(book_cls("Матильда", "Автор"))
            assert len(reading_list.books) == 2
        record("Список принимает книги", "Добавь add_book(self, book), который сохраняет объект в self.books.", add_books)

        def filter_unread():
            book_cls = namespace.get("Book")
            list_cls = namespace.get("ReadingList")
            reading_list = list_cls()
            first = book_cls("Первая", "Автор")
            second = book_cls("Вторая", "Автор")
            reading_list.add_book(first)
            reading_list.add_book(second)
            first.mark_as_read()
            unread = reading_list.unread_books()
            assert len(unread) == 1 and unread[0].title == "Вторая"
        record("Находятся только непрочитанные", "В unread_books пройди циклом по self.books и добавь книги, у которых is_read ещё False.", filter_unread)

        def lists_are_independent():
            cls = namespace.get("ReadingList")
            first = cls()
            second = cls()
            first.books.append("одна книга")
            assert second.books == []
        record("У разных списков своё содержимое", "Создавай пустой список внутри __init__, чтобы каждый ReadingList получил собственный books.", lists_are_independent)

    elif exercise == "practice3":
        def classes_exist():
            for name in ("ReadingMaterial", "Book", "AudioBook"):
                assert isinstance(namespace.get(name), type)
        record("Созданы три класса", "Проверь имена ReadingMaterial, Book и AudioBook.", classes_exist)

        def inheritance_works():
            base = namespace["ReadingMaterial"]
            assert issubclass(namespace["Book"], base)
            assert issubclass(namespace["AudioBook"], base)
            book = namespace["Book"]("Книга", "Автор")
            audio = namespace["AudioBook"]("Аудио", "Чтец")
            assert book.title == "Книга" and audio.title == "Аудио"
        record("Книга и аудиокнига наследуют название", "Укажи ReadingMaterial в скобках после Book и AudioBook и вызови super().__init__(title).", inheritance_works)

        def descriptions_differ():
            book = namespace["Book"]("Книга", "Автор")
            audio = namespace["AudioBook"]("Аудио", "Чтец")
            book_text = str(book.description())
            audio_text = str(audio.description())
            assert "Книга" in book_text and "Автор" in book_text
            assert "Аудиокнига" in audio_text and "Аудио" in audio_text and "Чтец" in audio_text
        record("У каждого материала своё описание", "Переопредели description() в обоих подклассах и включи характерные данные.", descriptions_differ)

        def common_function():
            book = namespace["Book"]("Книга", "Автор")
            audio = namespace["AudioBook"]("Аудио", "Чтец")
            function = namespace.get("describe_all")
            assert callable(function)
            output.seek(0)
            output.truncate(0)
            returned = function([book, audio])
            text = output.getvalue()
            if returned is not None:
                text += str(returned)
            assert "Книга" in text and "Аудио" in text
        record("Один цикл обрабатывает оба вида", "Определи describe_all(items) и вызывай item.description() для каждого элемента без проверки типа.", common_function)
    else:
        raise ValueError("Неизвестное упражнение.")

    sys.stdout = saved_stdout
    print(json.dumps({"results": results, "output": output.getvalue()}, ensure_ascii=False))
except SyntaxError as error:
    sys.stdout = saved_stdout
    print(json.dumps({"error": "Синтаксическая ошибка около строки " + str(error.lineno or "?") + ": " + error.msg}, ensure_ascii=False))
except RestrictedSyntax as error:
    sys.stdout = saved_stdout
    print(json.dumps({"error": str(error)}, ensure_ascii=False))
except Exception as error:
    sys.stdout = saved_stdout
    message = str(error).splitlines()[0][:180] or type(error).__name__
    print(json.dumps({"error": "Код завершился ошибкой: " + message}, ensure_ascii=False))
"""

def run_submission(exercise: str, source: str) -> dict:
    if exercise not in {"practice1", "practice2", "practice3"}:
        return {"error": "Неизвестное практическое задание."}
    if not source.strip():
        return {"error": "Напиши решение в поле кода, затем нажми «Проверить решение»."}
    if len(source) > MAX_SOURCE:
        return {"error": "Решение слишком длинное. Для практики достаточно 12 000 символов."}
    try:
        completed = subprocess.run(
            [sys.executable, "-I", "-S", "-c", RUNNER],
            input=json.dumps({"exercise": exercise, "source": source}, ensure_ascii=False),
            text=True,
            capture_output=True,
            timeout=TIME_LIMIT,
            cwd=PROJECT_ROOT,
            check=False,
        )
    except subprocess.TimeoutExpired:
        return {"error": "Программа выполнялась слишком долго. Проверь циклы и повтори."}
    if completed.returncode != 0:
        return {"error": "Не удалось выполнить проверку. Попробуй ещё раз."}
    try:
        return json.loads(completed.stdout)
    except json.JSONDecodeError:
        return {"error": "Не удалось прочитать результат проверки."}

class CourseHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def log_message(self, format, *args):
        return

    def _send_json(self, status: int, value: dict):
        body = json.dumps(value, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path != "/api/check":
            self._send_json(404, {"error": "Страница не найдена."})
            return
        expected_origin = "http://127.0.0.1:" + str(self.server.server_port)
        if self.headers.get("Origin") != expected_origin:
            self._send_json(403, {"error": "Проверка принимает код только из открытого курса на этом компьютере."})
            return
        if self.headers.get_content_type() != "application/json":
            self._send_json(415, {"error": "Ожидались данные практического задания."})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > MAX_SOURCE * 4 + 2000:
                self._send_json(413, {"error": "Размер решения превышает допустимый."})
                return
            payload = json.loads(self.rfile.read(length))
            result = run_submission(str(payload.get("exercise", "")), str(payload.get("source", "")))
            self._send_json(200, result)
        except (ValueError, json.JSONDecodeError):
            self._send_json(400, {"error": "Не удалось прочитать отправленное решение."})

def main():
    server = ThreadingHTTPServer(("127.0.0.1", 0), CourseHandler)
    port = server.server_address[1]
    url = "http://127.0.0.1:" + str(port) + "/app/index.html"
    print("Курс запущен локально: " + url)
    print("Оставь это окно открытым, пока занимаешься. Нажми Ctrl+C, чтобы завершить.")
    threading.Timer(1.0, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nКурс завершён.")

if __name__ == "__main__":
    main()
