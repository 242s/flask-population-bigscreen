import pymysql
import uuid
from flask import Flask, jsonify, render_template, request, g
from flask_apscheduler import APScheduler

app = Flask(__name__)

# 当前显示数据的索引，初始化为0
current_index = 0

# 建立数据库连接
def get_db():
    if 'db' not in g:
        g.db = pymysql.connect(
            host='localhost',
            user='root',
            password='123456',
            database='people',
            charset='utf8mb4'
        )
    return g.db


@app.teardown_appcontext
def close_db(error):
    if 'db' in g:
        g.db.close()


# 初始化APScheduler实例
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()


@app.route("/")
def hello():
    return render_template("index1.html")


# 提取公共的数据库查询执行函数，减少重复代码
def execute_query(query):
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute(query)
        return cursor.fetchall()
    except pymysql.Error as e:
        print(f"执行数据库查询出现错误: {e}")
        return None


@app.route("/l2", methods=["get", "post"])
def get_data_l2():
    global current_index
    rows = execute_query("SELECT place,number, man,woman,year_2024,year_2023,year_2022,year_2021 FROM data")
    if rows:
        if current_index < len(rows):
            current_row = rows[current_index]
            city = current_row[0]
            man = current_row[2]
            woman = current_row[3]
            data = {
                "man": man,
                "woman": woman,
                "city":city
            }
            current_index = (current_index + 1) % len(rows)  # 更新索引，循环展示数据
            return jsonify(data)
        else:
            current_index = 0  # 若已展示完所有数据，重置索引重新开始展示
            return jsonify({"error": "已展示完所有数据，重新开始展示"})
    else:
        return jsonify({"error": "No data found in database"}), 404


@app.route("/l1", methods=["get", "post"])
def get_data_l1():
    global current_index
    rows = execute_query("SELECT place,number, man,woman,year_2024,year_2023,year_2022,year_2021 FROM data")
    x = []
    if rows:
        if current_index < len(rows):
            current_row = rows[current_index]
            for i in range(4, 8):
                x.append(current_row[i])
            current_index = (current_index + 1) % len(rows)  # 更新索引，循环展示数据
            x.append(current_row[0])
            return jsonify(x)
        else:
            current_index = 0  # 若已展示完所有数据，重置索引重新开始展示
            return jsonify({"error": "已展示完所有数据，重新开始展示"})
    else:
        return jsonify({"error": "No data found in database"}), 404


@app.route("/c1", methods=["get", "post"])
def test():
    global current_index
    rows = execute_query("SELECT place,number, man,woman,year_2024,year_2023,year_2022,year_2021 FROM data")
    if rows:
        if current_index < len(rows):
            current_row = rows[current_index]
            place = current_row[0]
            number = current_row[1]
            man = current_row[2]
            woman = current_row[3]
            data = {
                "city": place,
                "number": number,
                "man": man,
                "woman": woman,
            }
            current_index = (current_index + 1) % len(rows)  # 更新索引，循环展示数据
            return jsonify(data)
        else:
            current_index = 0  # 若已展示完所有数据，重置索引重新开始展示
            return jsonify({"error": "已展示完所有数据，重新开始展示"})
    else:
        return jsonify({"error": "No data found in database"}), 404


# 定义定时任务函数，触发数据的更新（即切换到下一行数据展示）
# 其主要作用是通过更新current_index来切换展示的数据行，实现数据的循环展示
# def scheduled_task():
#     global current_index
#     rows = execute_query("SELECT place,number, man,woman,year_2024,year_2023,year_2022,year_2021 FROM data")
#     if rows:
#         current_index = (current_index + 1) % len(rows)
#     else:
#         current_index = 0


# 添加定时任务，每隔5秒执行一次scheduled_task函数（即切换展示下一行数据）
# with app.app_context():
#     task_id = str(uuid.uuid4())
#     scheduler.add_job(func=scheduled_task, trigger='interval', seconds=5, id=task_id)


if __name__ == "__main__":
    app.run(debug=True)