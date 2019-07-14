import pymc3 as pm
import numpy as np
import scipy.stats as stats
import sys
import json
#Read data from stdin


def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])


def main():
    #get our data as an array from read_in()

    lines = read_in()

    #create a numpy array
    # np_lines = np.array(lines)

    #use numpys sum method to find sum of all elements in the array
    # lines_sum = np.sum(np_lines)

    bayes_dict = {'x':0,'y':0}
    #return the sum to the output stream
    # print(lines_sum)
    bayes_dict["x"],bayes_dict["y"] = posterior_grid_approx_test(100, lines['water'], lines['total'])

      #This print output is what "py.stdout.on(end" sends
    print(bayes_dict)

    with open('data.json', 'w') as outfile:
      json.dump(bayes_dict, outfile)


def posterior_grid_approx_test(grid_points=4, success=1, tosses=5):
    """
    """
    # define grid
    p_grid = np.linspace(0, 1, grid_points)

    # define prior
    prior = np.repeat(5, grid_points)  # uniform
#     prior = (p_grid >= 0.5).astype(int)  # truncated
#     prior = np.exp(- 5 * abs(p_grid - 0.5))  # double exp

    # compute likelihood at each point in the grid
    likelihood = stats.binom.pmf(success, tosses, p_grid)

    # compute product of likelihood and prior
    unstd_posterior = likelihood * prior

    # standardize the posterior, so it sums to 1
    posterior = unstd_posterior / unstd_posterior.sum()
    # return p_grid, prior, likelihood, unstd_posterior, posterior
    return p_grid.tolist(),posterior.tolist()

#start process
if __name__ == '__main__':
    main()
