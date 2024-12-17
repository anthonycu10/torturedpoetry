import pandas as pd
import numpy as np
import re
import nltk

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()

# method to lemmatize user search
def lemmatize_text(text):
    return ' '.join(lemmatizer.lemmatize(w) for w in (re.sub(',', '', text).lower()).split())

# method to find search recommendations
def get_results(user_input):
    # load data
    df = pd.read_csv('data/songs_lyrics.csv')

    # determine the number of words in user search
    search_length = user_input.split()
    n_words = len(search_length)

    # if user is looking for phrase (trigrams to total word-grams)
    if n_words > 2:
        tfv = TfidfVectorizer(ngram_range=(3, n_words), use_idf=False)
        tfv_matrix = tfv.fit_transform(df['lemmatize_lyrics'])

    # if user is just searching for words (unigrams, bigrams)
    else:
        tfv = TfidfVectorizer(ngram_range=(1, n_words), use_idf=False)
        tfv_matrix = tfv.fit_transform(df['lemmatize_lyrics'])
    
    # fit user input 
    tfv_user = tfv.transform([lemmatize_text(user_input)])

    # calculate similarity scores between search and all songs
    cosine_similarities = cosine_similarity(tfv_user, tfv_matrix)
    cosine_similarities = cosine_similarities.flatten()

    # create matrix for all songs that match 
    matches = pd.DataFrame()
    matches['index'] = np.where(cosine_similarities > 0)[0]
    matches['score'] = cosine_similarities[matches]
    matches_sorted = matches.sort_values(by='score', ascending=False)

    # store as rv
    recommendations = []
    for i in range(len(matches_sorted)):
        song_index = matches_sorted['index'].iloc[i]
        recommendations.append({
            "song_title": df['song_title'][song_index],
            "similarity_score": round(matches_sorted['score'].iloc[i], 4)
        })

    return recommendations
