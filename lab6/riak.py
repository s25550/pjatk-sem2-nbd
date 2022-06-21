import riak
riakClient = riak.RiakClient(pb_port=8087)
bucket = riakClient.bucket('s25550')

# add new student
student6 = {"name": "Michal", "surname": "Roslaniec", "isMale": true}
key = bucket.new('student6', data=student6)
key.store()
print('Rekord zostal zapisany')

# get and print student data
student6_1 = bucket.get('student6')
print('student6: ' + str(student6_1.data))

# edit student
student6_1.data['surname'] = "Kowalski"
student6_1.store()

student6_2 = bucket.get('student6')
print('student6 po edycji: ' + str(student6_2.data))

# delete student
student6_2.delete()
print('student6 zostal usuniety')

student6_3 = bucket.get('student')
print('student6 po usunieciu: ' + str(student6_3.data))
