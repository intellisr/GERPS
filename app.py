from flask import Flask, render_template, redirect, url_for, request ,session,jsonify,json
import mysql.connector
import joblib
from sklearn.svm import SVC
import urllib.request
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np

#mysql connection
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="",
  database="gerp"
)

mycursor = mydb.cursor()

app = Flask(__name__)

app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'

@app.route("/")
def main():
    return render_template('Loginadmin.html')

@app.route("/dash")
def dash():
    name = session['Uname']
    role = session['Urole']
    details=[name,role]
    cursor = mydb.cursor(buffered=True)
    sql_select_query = "SELECT COUNT(email) FROM employees"
    cursor.execute(sql_select_query)
    record = cursor.fetchall()
    return render_template('DashBoard.html',result=[details,record])

@app.route("/predict")
def predict():
    role=session['Urole']
    if role == "Super Admin" or role == "Admin":        
        return render_template('predict.html')    
    else:
        return render_template('Loginadmin.html')

@app.route("/admin")
def admin():
    
   cursor = mydb.cursor(buffered=True)
   sql_select_query = "select * from admin"
   cursor.execute(sql_select_query)
   record = cursor.fetchall()
   if record:
        role=session['Urole']
        if role=="Super Admin":        
            return render_template('Viewadmin.html',result=record)    
        else:
            return render_template('Loginadmin.html')
       
   else:
        role=session['Urole']
        if role=="Super Admin" or role=="Admin":        
            return render_template('Viewadmin.html',result=[['9','Sarath Chandana','Super Admin','12345678'],])
        else:
            return render_template('Loginadmin.html')
       
              
@app.route('/addadmin',methods=['GET', 'POST']) 
def addadmin():    
    
    if request.method == 'POST':
      id = request.form['id']
      name = request.form['name']
      role = request.form['role']
      pw = request.form['pw']

    cursor = mydb.cursor(buffered=True)
    sql = """INSERT INTO admin (id, name,role,pw) VALUES (%s, %s ,%s,%s)"""
    val = (id,name,role,pw)
    cursor.execute(sql, val)
    mydb.commit() 
    return redirect(url_for('admin'))

@app.route('/updateadmin',methods=['GET', 'POST']) 
def updateadmin():    
    
    if request.method == 'POST':
      id = request.form['id']
      name = request.form['name']
      role = request.form['role']
       
              
    cursor = mydb.cursor(buffered=True)
    sql = """UPDATE admin SET name =%s,role=%s WHERE id=%s """
    val = (name,role,id)
    cursor.execute(sql, val)
    mydb.commit()
    
    return redirect(url_for('admin'))

@app.route('/deleteadmin',methods=['GET', 'POST']) 
def deleteadmin():    
    
    if request.method == 'POST':
      id = request.form['id']       
              
    cursor = mydb.cursor(buffered=True)
    sql = " DELETE FROM admin WHERE id = %s "
    val = (id,)
    cursor.execute(sql, val)
    mydb.commit()
    
    return redirect(url_for('admin'))

#Login,Register and Logout

@app.route('/logout') 
def logout():
    
    session['Uid']="null"
    return render_template('Loginadmin.html')


@app.route('/loginadmin',methods = ['POST', 'GET'])
def loginadmin():
    
   if request.method == 'POST':
      username = request.form['uname']
      pw = request.form['pwd']
              
   cursor = mydb.cursor(buffered=True)
   sql_select_query = "select * from admin where id = %s and pw = %s"
   cursor.execute(sql_select_query, (username,pw))
   record = cursor.fetchall()
   if record:
       for x in record:
           if x is None:
               return redirect(url_for('main')) 
           else:    
               session['Uid']=record[0][0]
               session['Uname']=record[0][1]
               session['Urole']=record[0][2]
               print(record[0])
               return redirect(url_for('dash'))  
   else:
       return redirect(url_for('main'))
   
#predict tenure time and  resignation factor
@app.route('/predict_data',methods=['GET','POST']) 
def predict_data():    

    data=request.form
    val1=eval(data['a'])
    val2=eval(data['b'])
    val3=eval(data['c'])
    val4=eval(data['d'])
    val5=eval(data['e'])
    val6=eval(data['f'])
    val7=eval(data['g'])
    val8=eval(data['h'])
    val9=eval(data['i'])
    val10=eval(data['j'])
    val11=eval(data['k'])
    
    algorithm=joblib.load('Tenure_time_Predict.sav')
    algorithmx=joblib.load('Tenure_factor_Predict.sav')
    #loading the trained algorithm
    result=algorithm.predict([[val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11]])
    resultx=algorithmx.predict([[val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11]])
    
    answer='Tenure period is "'+result[0]+'" and the reason for turnover maybe "'+resultx[0]+'"'
    print(answer)
    return render_template("predict.html", result = answer) 

            
if __name__ == "__main__":
	app.run(debug=True, use_reloader=True)
   


